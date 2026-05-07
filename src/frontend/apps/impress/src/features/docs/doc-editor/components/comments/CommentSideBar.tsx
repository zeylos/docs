import { CommentsExtension } from '@blocknote/core/comments';
import { BlockNoteView } from '@blocknote/mantine';
import { ThreadsSidebar, useCreateBlockNote } from '@blocknote/react';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

import { Box, ButtonCloseModal, Text } from '@/components/';
import { Doc } from '@/docs/doc-management';
import { useAuth } from '@/features/auth';

import { useComments } from './useComments';

interface CommentSideBarProps {
  doc: Doc;
  onClose: () => void;
}

export const CommentSideBar = ({ doc, onClose }: CommentSideBarProps) => {
  const { user } = useAuth();
  const canSeeComment = doc.abilities.comment;
  const { t } = useTranslation();

  const { resolveUsers, threadStore } = useComments(
    doc.id,
    canSeeComment,
    user,
  );

  const editor = useCreateBlockNote(
    {
      extensions: [CommentsExtension({ threadStore, resolveUsers })],
    },
    [threadStore, resolveUsers],
  );

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

      <BlockNoteView
        className="--docs--main-editor"
        aria-label={t('Document editor')}
        editor={editor}
        formattingToolbar={false}
        slashMenu={false}
        theme="light"
        comments={false}
        renderEditor={false}
      >
        <ThreadsSidebar filter="all" sort="recent-activity" />
      </BlockNoteView>
    </Box>
  );
};
