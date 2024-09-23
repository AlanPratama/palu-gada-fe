import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import ReviewsApi from "../../../apis/reviewsApi";
import CrudModal from "./components/CrudModal";

const ReviewsPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.reviews);
  const [selectedReview, setSelectedReview] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const user = useSelector((state) => state?.users?.selectedItem);
  const post = useSelector((state) => state?.posts?.selectedItem);
  const [isLoading, setIsLoading] = useState(true);

  const [showBy, setShowBy] = useState(new Set(["all"]));
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const ratingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<ion-icon key={`full-${i}`} name="star" />);
    }

    if (hasHalfStar) {
      stars.push(<ion-icon key="half" name="star-half" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<ion-icon key={`empty-${i}`} name="star-outline" />);
    }

    return <>{stars}</>;
  };

  const fetchReviews = useCallback(
    async (filter) => {
      if (filter == "all") {
        await ReviewsApi.getAllReviews(
          page - 1,
          rowsPerPage,
          debounceSearchQuery
        );
        setIsLoading(false);
      }
      if (filter == "user") {
        await ReviewsApi.getAllReviewsByUser(
          user?.id ?? 0,
          page - 1,
          rowsPerPage,
          debounceSearchQuery
        );
        setIsLoading(false);
      }
      if (filter == "post") {
        await ReviewsApi.getAllReviewsByPost(
          post?.id ?? 0,
          page - 1,
          rowsPerPage,
          debounceSearchQuery
        );
        setIsLoading(false);
      }
    },
    [debounceSearchQuery, rowsPerPage, page, post, user]
  );

  const handleDelete = useCallback(
    async (reviewId) => {
      await ReviewsApi.deleteReviews(reviewId);
      fetchReviews("all");
    },
    [fetchReviews]
  );

  const handleOpenModal = useCallback(
    (type, review = null) => {
      setModalType(type);
      setSelectedReview(review);
      onOpen();
    },
    [onOpen]
  );

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  useEffect(() => {
    fetchReviews([...showBy][0]);
  }, [fetchReviews, showBy]);

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-col">
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-6">
              <h1 className="font-bold sm:text-2xl text-xl mr-4">ULASAN</h1>
              {[...showBy][0] == "all" && (
                <Input
                  isClearable
                  placeholder="Cari berdasarkan nama..."
                  startContent={<ion-icon name="search-outline" />}
                  value={filterValue}
                  onClear={() => onSearchChange("")}
                  onValueChange={onSearchChange}
                />
              )}
            </div>
            <div className="flex gap-2">
              {[...showBy][0] == "user" && (
                <Button onPress={() => handleOpenModal("Pilih User")}>
                  Pilih Pengguna
                </Button>
              )}
              {[...showBy][0] == "post" && (
                <Button onPress={() => handleOpenModal("Pilih Postingan")}>
                  Pilih Postingan
                </Button>
              )}

              <Dropdown>
                <DropdownTrigger>
                  <Button color={"primary"} isIconOnly>
                    <ion-icon name="funnel-outline"></ion-icon>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown Variants"
                  color={"primary"}
                  variant={"faded"}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={showBy}
                  onSelectionChange={setShowBy}
                  className="dark:text-white"
                >
                  <DropdownItem key="all">Seluruh Ulasan</DropdownItem>
                  <DropdownItem key="user">Berdasarkan Pengguna</DropdownItem>
                  <DropdownItem key="post">Berdasarkan Postingan</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          {[...showBy][0] == "user" && (
            <div className="flex justify-between w-full">
              {user?.email ? (
                <p className="text-gray-500">
                  dari pengguna <span className="font-bold">{user?.email}</span>
                </p>
              ) : (
                <p className="text-red-500">Pilih pengguna terlebih dahulu</p>
              )}
            </div>
          )}
          {[...showBy][0] == "post" && (
            <div className="flex justify-between w-full">
              {post?.title ? (
                <p className="text-gray-500">
                  dari postingan berjudul{" "}
                  <span className="font-bold">{post?.title}</span>
                </p>
              ) : (
                <p className="text-red-500">Pilih postingan terlebih dahulu</p>
              )}
            </div>
          )}
          <div className="flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4">
            <p className="text-gray-500 text-sm my-auto">
              Total {total} ulasan
            </p>
            <label className="flex items-center text-gray-500 text-small">
              Baris per halaman:
              <select
                className="bg-transparent outline-none text-gray-500 text-small"
                value={rowsPerPage}
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </CardHeader>

        <Table
          className="overflow-auto"
          shadow="none"
          color="primary"
          selectionMode="single"
          aria-label="Reviews table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>PENGGUNA</TableColumn>
            <TableColumn>POSTINGAN</TableColumn>
            <TableColumn>RATING</TableColumn>
            <TableColumn>KOMENTAR</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              isLoading ? <Spinner label="Memuat..." /> : "Tidak ada data"
            }
          >
            {items.map((review, index) => (
              <TableRow key={review.id + " - " + index}>
                <TableCell>
                  {review.id ?? index + 1 + rowsPerPage * (page - 1)}
                </TableCell>
                <TableCell>{review?.user?.email}</TableCell>
                <TableCell>{review?.post?.title}</TableCell>
                <TableCell>{ratingStars(review.rating)}</TableCell>
                <TableCell>{review?.comment}</TableCell>
                <TableCell>
                  <Button
                    className="font-bold"
                    size="sm"
                    color="danger"
                    variant="solid"
                    onClick={() => handleOpenModal("Hapus", review)}
                    startContent={
                      <ion-icon name="trash-outline" size="small" />
                    }
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardFooter>
          {total > 0 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={Math.ceil(total / rowsPerPage)}
                onChange={setPage}
              />
            </div>
          )}
        </CardFooter>
      </Card>

      {isOpen && (
        <CrudModal
          isOpen={isOpen}
          modalType={modalType}
          selectedReview={selectedReview}
          onClose={() => onOpenChange(false)}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};

export default ReviewsPage;
