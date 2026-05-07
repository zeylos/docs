import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

import { Box } from '@/components';
import { CommentSideBar } from '@/features/docs/doc-editor/components/comments/CommentSideBar';
import { useDocStore } from '@/features/docs/doc-management';

import { useRightPanelStore } from './useRightPanelStore';

export const RightPanel = () => {
  const { t } = useTranslation();
  const { currentDoc: doc } = useDocStore();
  const { setIsPanelOpen, isPanelOpen } = useRightPanelStore();

  if (!doc) {
    return null;
  }

  return (
    <Box
      className="right-panel"
      aria-label={t('Right panel')}
      aria-hidden={!isPanelOpen}
      $width="300px"
      $height="100vh"
      $hasTransition="slow"
      $background="var(--c--contextuals--background--surface--secondary)"
      $css={css`
        border-left: 1px solid var(--c--contextuals--border--surface--primary);
        transform: translateX(0%);
        flex: 1;
        margin-left: 1rem;
        ${!isPanelOpen &&
        css`
          transform: translateX(200%);
          opacity: 0;
          flex: 0;
          margin-left: 0rem;
          max-width: 0rem;
        `}
      `}
    >
      <CommentSideBar doc={doc} onClose={() => setIsPanelOpen(false)} />
    </Box>
  );
};
