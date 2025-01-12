import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import BidsApi from "../../../apis/bidsApi";

const BidsPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const { items, total } = useSelector((state) => state.bids);
  const [debounceSearchQuery] = useDebounce(filterValue, 700);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBids = useCallback(async () => {
    await BidsApi.getAllBids(page - 1, rowsPerPage, debounceSearchQuery);
    setIsLoading(false);
  }, [debounceSearchQuery, rowsPerPage, page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  return (
    <Card className="p-4">
      <CardHeader className="flex flex-col">
        <div className="flex flex-row w-full justify-between">
          <div className="flex sm:flex-row flex-col sm:gap-4 gap-6">
            <h1 className="font-bold sm:text-2xl text-xl">TAWARAN</h1>
            <Input
              isClearable
              placeholder="Cari berdasarkan nama..."
              startContent={<ion-icon name="search-outline" />}
              value={filterValue}
              onClear={() => onSearchChange("")}
              onValueChange={onSearchChange}
            />
          </div>
        </div>
        <div className="flex sm:flex-row flex-col w-full justify-between pt-4 -mb-4">
          <p className="text-gray-500 text-sm my-auto">Total {total} tawaran</p>
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
        aria-label="Bids table"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>HARGA TAWARAN</TableColumn>
          <TableColumn>STATUS TAWARAN</TableColumn>
          <TableColumn>EMAIL PENAWAR</TableColumn>
          <TableColumn>JUDUL POSTINGAN</TableColumn>
          <TableColumn>BUDGET</TableColumn>
          <TableColumn>AKSI</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            isLoading ? <Spinner label="Memuat..." /> : "Tidak ada data"
          }
        >
          {items.map((bid) => (
            <TableRow key={bid.id}>
              <TableCell>{bid.id}</TableCell>
              <TableCell>{`Rp ${bid.amount.toLocaleString()}`}</TableCell>
              <TableCell>
                <Chip
                  color={
                    bid.status === "ACCEPTED"
                      ? "primary"
                      : bid.status === "FINISH"
                      ? "success"
                      : bid.status === "PENDING"
                      ? "warning"
                      : bid.status === "REJECTED"
                      ? "danger"
                      : "secondary"
                  }
                  variant="flat"
                >
                  {bid.status}
                </Chip>
              </TableCell>
              <TableCell>{bid.user.email}</TableCell>
              <TableCell>{bid.post.title}</TableCell>
              <TableCell>
                {`Rp ${bid.post.budgetMin.toLocaleString()} - Rp ${bid.post.budgetMax.toLocaleString()}`}
              </TableCell>
              <TableCell>
                <Link to={"/bids/" + bid.id}>
                  <Button
                    className="font-bold"
                    size="sm"
                    color="primary"
                    variant="solid"
                    startContent={<ion-icon name="open-outline" size="small" />}
                  >
                    Detail
                  </Button>
                </Link>
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
  );
};

export default BidsPage;
