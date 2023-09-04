"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = void 0;
var query = {
  getAllProducts: "SELECT * FROM OEE_Products",
  insertProducts: "\n    INSERT INTO OEE_Products(\n      pr_name,\n      pr_line,\n      pr_station,\n      pr_baan,\n      created_at,\n      updated_at\n  )\n  VALUES(\n      @pr_name,\n      @pr_line,\n      @pr_station,\n      @pr_baan,\n      @created_at,\n      @updated_at\n)",
  getProductById: "\n  SELECT * FROM OEE_Products\n  WHERE id = @id\n",
  deleteProduct: "\n    DELETE FROM OEE_Products\n    WHERE id = @id\n",
  countProducts: "\n    SELECT COUNT(*) FROM OEE_Products\n",
  updateProductById: "\n    UPDATE OEE_Products\n    SET pr_name = @pr_name,\n    pr_line = @pr_line,\n    pr_station = @pr_station,\n    pr_baan = @pr_baan,\n    created_at = @created_at,\n    updated_at = @updated_at\n    WHERE id = @id\n"
};
exports.query = query;