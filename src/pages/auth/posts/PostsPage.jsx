import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
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
import PostsApi from "../../../apis/postsApi";
import CrudModal from "./components/CrudModal";
import { useDebounce } from "use-debounce";

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const [debounceSearchQuery] = useDebounce(filterValue, 700);

  const fetchPosts = useCallback(async () => {
    await PostsApi.getAllPosts(page - 1, rowsPerPage, debounceSearchQuery);
  }, [debounceSearchQuery, rowsPerPage, page]);

  const handlePostAction = useCallback(
    async (action, post = null) => {
      switch (action) {
        case "ubah":
          await PostsApi.editPosts(post);
          break;
        case "hapus":
          await PostsApi.deletePosts(selectedPost.id);
          break;
        default:
          break;
      }
      fetchPosts();
      onOpenChange(false);
    },
    [selectedPost, onOpenChange, fetchPosts]
  );

  const handleOpenModal = useCallback(
    (type, post = null) => {
      setModalType(type);
      setSelectedPost(post);
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
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <Card className="p-4">
        <CardHeader className="flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <div className="flex sm:flex-row flex-col sm:gap-4 gap-6">
              <h1 className="font-bold sm:text-2xl text-xl">UNGGAHAN</h1>
              <Input
                isClearable
                className="w-[150%]"
                placeholder="Cari berdasarkan nama..."
                startContent={<ion-icon name="search-outline" />}
                value={filterValue}
                onClear={() => onSearchChange("")}
                onValueChange={onSearchChange}
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4">
            <p className="text-gray-500 text-sm my-auto">
              Total {total} unggahan
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
          className="overflow-auto sm:max-w-full max-w-[250px]"
          shadow="none"
          color="primary"
          selectionMode="single"
          aria-label="Posts table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>TUGAS</TableColumn>
            <TableColumn>DESKRIPSI</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>PENGUNGGAH</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody emptyContent="Tidak ada data">
            {items.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>
                  <Chip
                    color={post.status === "AVAILABLE" ? "success" : "warning"}
                    variant="dot"
                  >
                    {post.status}
                  </Chip>
                </TableCell>
                <TableCell>{post?.user?.email}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        •••
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu className="dark:text-white">
                      <DropdownItem
                        key="edit"
                        startContent={<ion-icon name="pencil" />}
                        color="secondary"
                        onPress={() => handleOpenModal("Ubah", post)}
                      >
                        Ubah
                      </DropdownItem>
                      <DropdownItem
                        startContent={<ion-icon name="information-circle" />}
                        color="primary"
                        onPress={() => {
                          handleOpenModal("Detail", post);
                        }}
                      >
                        Detail
                      </DropdownItem>
                      <DropdownItem
                        startContent={<ion-icon name="trash" />}
                        color="danger"
                        onPress={() => {
                          handleOpenModal("Hapus", post);
                        }}
                      >
                        Hapus
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
          selectedPost={selectedPost}
          onClose={() => onOpenChange(false)}
          onSubmit={handlePostAction}
        />
      )}
    </>
  );
};

export default PostsPage;
