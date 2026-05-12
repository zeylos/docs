import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

import { Box } from '@/components';
import { CommentSideBar } from '@/features/docs/doc-editor/components/comments/CommentSideBar';
import { useDocStore, useProviderStore } from '@/features/docs/doc-management';
import { HEADER_HEIGHT } from '@/features/header';

import { useRightPanelStore } from './useRightPanelStore';

export const RightPanel = () => {
  const { t } = useTranslation();
  const { currentDoc: doc } = useDocStore();
  const { setIsPanelOpen, isPanelOpen } = useRightPanelStore();
  const { provider, isReady } = useProviderStore();
  const isProviderReady =
    isReady && provider && provider?.configuration.name === doc?.id;

  if (!doc || !isProviderReady) {
    return null;
  }

  return (
    <Box
      className="right-panel"
      aria-label={t('Right panel')}
      aria-hidden={!isPanelOpen}
      $width="300px"
      $minHeight={`calc(100dvh - ${HEADER_HEIGHT}px)`}
      $position="sticky"
      $hasTransition="slow"
      $background="var(--c--contextuals--background--surface--secondary)"
      $css={css`
        border-left: 1px solid var(--c--contextuals--border--surface--primary);
        transform: translateX(0%);
        margin-left: 1rem;
        top: 0;
        align-self: flex-start;
        opacity: 1;
        ${!isPanelOpen &&
        css`
          transform: translateX(200%);
          opacity: 0;
          margin-left: 0rem;
          width: 0;
        `}
      `}
    >
      <CommentSideBar
        doc={doc}
        onClose={() => setIsPanelOpen(false)}
        provider={provider}
      />
    </Box>
  );
};
