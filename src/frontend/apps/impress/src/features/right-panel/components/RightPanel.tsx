import { useTranslation } from 'react-i18next';

import { Box } from '@/components';
import { CommentSideBar } from '@/features/docs/doc-editor/components/comments/CommentSideBar';
import { useDocStore } from '@/features/docs/doc-management';

export const RightPanel = () => {
  const { t } = useTranslation();
  const { currentDoc: doc } = useDocStore();

  if (!doc) {
    return null;
  }

  return (
    <Box
      className="right-panel"
      aria-label={t('Right panel')}
      $width="100%"
      //$maxWidth="20rem"
      $height="100vh"
      $hasTransition="slow"
      $css={`
        top: 0vh;
        right: 0;
        transform: translateX(0%);
        flex: 1;
        //margin-left: 1rem;
      `}
      //aria-hidden={!isPanelOpen}
    >
      <CommentSideBar doc={doc} />
    </Box>
  );
};

// export const IconOpenPanelEditor = () => {
//   const { headings } = useHeadingStore();
//   const { t } = useTranslation();
//   const { setIsPanelOpen, isPanelOpen, setIsPanelTableContentOpen } =
//     usePanelEditorStore();
//   const [hasBeenOpen, setHasBeenOpen] = useState(isPanelOpen);
//   const { isMobile } = useResponsiveStore();

//   const setClosePanel = () => {
//     setHasBeenOpen(true);
//     setIsPanelOpen(!isPanelOpen);
//   };

//   // Open the panel if there are more than 1 heading
//   useEffect(() => {
//     if (headings?.length && headings.length > 1 && !hasBeenOpen && !isMobile) {
//       setIsPanelTableContentOpen(true);
//       setIsPanelOpen(true);
//       setHasBeenOpen(true);
//     }
//   }, [
//     headings,
//     setIsPanelTableContentOpen,
//     setIsPanelOpen,
//     hasBeenOpen,
//     isMobile,
//   ]);

//   // If open from the doc header we set the state as well
//   useEffect(() => {
//     if (isPanelOpen && !hasBeenOpen) {
//       setHasBeenOpen(true);
//     }
//   }, [hasBeenOpen, isPanelOpen]);

//   // Close the panel unmount
//   useEffect(() => {
//     return () => {
//       setIsPanelOpen(false);
//     };
//   }, [setIsPanelOpen]);

//   return (
//     <Icon
//       iconName="menu_open"
//       aria-label={isPanelOpen ? t('Close the panel') : t('Open the panel')}
//       $background="transparent"
//       $size="h2"
//       $zIndex={10}
//       $hasTransition="slow"
//       $css={`
//         cursor: pointer;
//         right: 0rem;
//         top: 0.1rem;
//         transform: rotate(${isPanelOpen ? '180deg' : '0deg'});
//         user-select: none;
//         ${hasBeenOpen ? 'display:flex;' : 'display: none;'}
//       `}
//       $position="absolute"
//       onClick={setClosePanel}
//       $radius="2px"
//     />
//   );
// };
