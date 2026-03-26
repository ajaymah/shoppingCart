import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function SearchFilterBar({
  searchText,
  onSearchTextChange,
  category,
  onCategoryChange,
  categories,
  resultCount,
}) {
  return (
    <Stack
      spacing={1.5}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: { xs: 1.5, md: 2 },
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
        Search & Filters
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <TextField
          label="Search by title"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          fullWidth
          inputProps={{ "aria-label": "Search by product title" }}
        />

        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            inputProps={{ "aria-label": "Select product category" }}
          >
            {categories.map((c) => (
              <MenuItem key={c.value} value={c.value}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: 700 }}
        >
          {resultCount} result{resultCount === 1 ? "" : "s"}
        </Typography>
      </Stack>
    </Stack>
  );
}

