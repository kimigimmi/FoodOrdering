import { useEffect } from "react";
import { MenuItem } from "./MenuItem";
import "../styles/Menu.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchItems, setParams } from "../store/itemsSlice";

export const Menu = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error, total, params } = useAppSelector((s) => s.items);

  // Arama için 300ms debounce
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(fetchItems());
    }, 300);
    return () => clearTimeout(t);
  }, [dispatch, params.q]);

  // Kategori/sort/sayfa/limit değişince anında fetch
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch, params.category, params.sort, params.page, params.limit]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setParams({ q: e.target.value, page: 1 }));
  };
  const onCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setParams({ category: e.target.value || undefined, page: 1 }));
  };
  const onSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setParams({ sort: e.target.value as any, page: 1 }));
  };

  const next = () =>
    dispatch(setParams({ page: (params.page ?? 1) + 1 }));
  const prev = () =>
    dispatch(setParams({ page: Math.max(1, (params.page ?? 1) - 1) }));

  const totalPages = Math.max(1, Math.ceil(total / (params.limit ?? 12)));

  return (
    <div className="menuContainer">
      <h1 className="menu-title">Menu</h1>

      <div className="filters">
        <input
          className="inp"
          placeholder="Search..."
          defaultValue={params.q}
          onChange={onSearch}
        />
        <select
          className="sel"
          defaultValue={params.category ?? ""}
          onChange={onCategory}
        >
          <option value="">All categories</option>
          <option value="Burgers">Burgers</option>
          <option value="Wraps">Wraps</option>
          <option value="Salads">Salads</option>
        </select>
        <select
          className="sel"
          defaultValue={params.sort ?? "newest"}
          onChange={onSort}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="rating_desc">Rating ↓</option>
        </select>
      </div>

      <div className="menu-items">
        {loading ? (
          <p className="muted">Loading...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : data.length === 0 ? (
          <p className="muted">No items available</p>
        ) : (
          data.map((m) => (
            <div className="menu-card" key={m.id}>
              <MenuItem menuItem={m} />
            </div>
          ))
        )}
      </div>

      <div className="pager">
        <button onClick={prev} disabled={(params.page ?? 1) <= 1}>
          Prev
        </button>
        <span>
          Page {params.page ?? 1} / {totalPages}
        </span>
        <button onClick={next} disabled={(params.page ?? 1) >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
