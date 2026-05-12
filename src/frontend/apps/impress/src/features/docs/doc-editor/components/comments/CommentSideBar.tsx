import { CommentsExtension } from '@blocknote/core/comments';
import { BlockNoteView } from '@blocknote/mantine';
import { ThreadsSidebar, useCreateBlockNote } from '@blocknote/react';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';
import { Awareness } from 'y-protocols/awareness.js';

import { Box, ButtonCloseModal, Text } from '@/components/';
import { Doc } from '@/docs/doc-management';
import { useAuth } from '@/features/auth';

import { useComments } from './useComments';

interface CommentSideBarProps {
  doc: Doc;
  onClose: () => void;
  provider: HocuspocusProvider;
}

export const CommentSideBar = ({
  doc,
  onClose,
  provider,
}: CommentSideBarProps) => {
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
      collaboration: {
        fragment: provider.document.getXmlFragment('document-store'),
        user: {
          name: '',
          color: '',
        },
        provider: provider as { awareness?: Awareness | undefined },
      },
      extensions: [CommentsExtension({ threadStore, resolveUsers })],
    },
    [threadStore, resolveUsers, provider],
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
        //className="--docs--main-editor"
        aria-label={t('Document editor')}
        editor={editor}
        formattingToolbar={false}
        slashMenu={false}
        theme="light"
        comments={false}
        //renderEditor={false}
      >
        <ThreadsSidebar filter="all" sort="recent-activity" />
      </BlockNoteView>
    </Box>
  );
};
