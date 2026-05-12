import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

import { Box, ButtonCloseModal, Text } from '@/components/';

import { useCommentSidebarStore } from './useCommentSidebarStore';

interface CommentSideBarProps {
  onClose: () => void;
}

const ORPHANED_THREAD_TEXT = 'Original content deleted';

const markOrphanedThreads = (container: HTMLElement) => {
  container.querySelectorAll<HTMLElement>('.bn-thread').forEach((thread) => {
    const headerText = thread.querySelector('.bn-header-text');
    const isOrphaned = headerText?.textContent === ORPHANED_THREAD_TEXT;
    thread.classList.toggle('bn-thread--orphaned', isOrphaned);
  });
};

export const CommentSideBar = ({ onClose }: CommentSideBarProps) => {
  const { t } = useTranslation();
  const { setThreadsSidebarTarget } = useCommentSidebarStore();
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (portalRef.current) {
      setThreadsSidebarTarget(portalRef.current);
    }
    return () => {
      setThreadsSidebarTarget(null);
    };
  }, [setThreadsSidebarTarget]);

  /**
   * Blocknote does not provide a way to distinguish
   * orphaned threads (i.e. threads whose associated content has been deleted)
   * from regular threads.
   * We use a MutationObserver to check for threads whose header text matches the
   * ORPHANED_THREAD_TEXT and add a specific class to them, which allows us to style them differently.
   * This is a bit of a hack, but it works until Blocknote provides a better way to handle this.
   * A issue has been opened in the Blocknote repo to request a better handling of orphaned threads:
   * https://github.com/TypeCellOS/BlockNote/issues/2735
   * When this issue is resolved, we can remove this code and adapt the styles.
   */
  useEffect(() => {
    const container = portalRef.current;
    if (!container) {
      return;
    }

    const observer = new MutationObserver(() => {
      markOrphanedThreads(container);
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <Box>
      <Box
        $padding={{ vertical: 'base', horizontal: 'sm' }}
        $css={css`
          border-bottom: 1px solid
            var(--c--contextuals--border--surface--primary);
        `}
      >
        <Box $direction="row" $align="center" $justify="space-between">
          <Text $weight="bold">{t('Comments')}</Text>
          <ButtonCloseModal
            aria-label={t('Close the comments sidebar')}
            onClick={onClose}
          />
        </Box>
      </Box>
      <div
        ref={portalRef}
        className="--docs--comments-sidebar bn-root bn-mantine"
        data-mantine-color-scheme="light"
      />
    </Box>
  );
};
