// components/Pagination.js
import { Button, HStack, IconButton, Text } from '@chakra-ui/react';
import { IoChevronBack } from 'react-icons/io5';

const Pagination = ({ currentPage, totalPages, onPageChange, t }) => {
  const maxButtons = 5;
  const getPageNumbers = () => {
    const pages = [];

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 2) {
      pages.push('left-ellipsis');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('right-ellipsis');
    }

    return pages;
  };

  return (
    <HStack spacing={1} mt={4} justify="center" wrap="wrap">

      <Button
        onClick={() => onPageChange(1)}
        variant={currentPage === 1 ? 'solid' : 'outline'}
        // colorScheme={currentPage === 1 ? 'blue' : 'gray'}
        bgColor={currentPage === 1 ? '#006A71' : '#E5E5E5'}
        borderColor={'gray.200'}
        size="sm"
        borderRadius={'11px'}
      >
        1
      </Button>

      {getPageNumbers().map((page, idx) =>
        page === 'left-ellipsis' || page === 'right-ellipsis' ? (
          <Text key={page + idx} >

          </Text>
        ) : (
          <Button

            key={page}
            onClick={() => onPageChange(page)}
            variant={currentPage === page ? 'solid' : 'outline'}
            bgColor={currentPage == page ? '#006A71' : '#E5E5E5'}
            borderColor={'gray.200'}
            // colorScheme={currentPage === page ? '#29CCCC' : 'gray'}
            size="sm"
            borderRadius={'11px'}
          >
            {page}
          </Button>
        )
      )}

      {totalPages > 1 && (
        <Button
          onClick={() => onPageChange(totalPages)}
          variant={currentPage === totalPages ? 'solid' : 'outline'}
          bgColor={currentPage == totalPages ? '#006A71' : '#E5E5E5'}
          borderColor={'gray.200'}
          size="sm"
          borderRadius={'11px'}
        >
          صفحه آخر
        </Button>
      )}

      <IconButton icon={<IoChevronBack />} bgColor='#006A71' color={'white'} variant={'outline'} onClick={() => onPageChange(currentPage + 1)} isDisabled={currentPage === totalPages} size={'sm'} borderRadius={'11px'}>
      </IconButton>


    </HStack>
  );
};

export default Pagination;
