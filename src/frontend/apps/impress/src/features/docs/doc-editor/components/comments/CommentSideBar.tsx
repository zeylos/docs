import { CommentsExtension } from '@blocknote/core/comments';
import { BlockNoteView } from '@blocknote/mantine';
import { ThreadsSidebar, useCreateBlockNote } from '@blocknote/react';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

import { Box } from '@/components/Box';
import { Doc } from '@/docs/doc-management';
import { useAuth } from '@/features/auth';

import { useComments } from './useComments';

interface CommentSideBarProps {
  doc: Doc;
}

export const CommentSideBar = ({ doc }: CommentSideBarProps) => {
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
        $padding="base"
        $css={css`
          border-bottom: 1px solid;
        `}
      >
        <Box $direction="row" $align="center" $gap="0.5rem">
          <Box
            $width="0.75rem"
            $height="0.75rem"
            $backgroundColor={`var(--${doc.color}-500)`}
            $borderRadius="50%"
          />
          <Box $fontSize="1.125rem" $fontWeight="500">
            {t('Comments')}
          </Box>
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
