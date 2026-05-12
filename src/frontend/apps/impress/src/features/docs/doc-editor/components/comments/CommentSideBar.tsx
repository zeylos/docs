import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

import { Box, ButtonCloseModal, Text } from '@/components/';

import { useCommentSidebarStore } from './useCommentSidebarStore';

interface CommentSideBarProps {
  onClose: () => void;
}

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
            aria-label={t('Close the share modal')}
            onClick={onClose}
          />
        </Box>
      </Box>
      <div
        ref={portalRef}
        className="--docs--main-editor bn-root bn-mantine"
        data-mantine-color-scheme="light"
      />
    </Box>
  );
};
