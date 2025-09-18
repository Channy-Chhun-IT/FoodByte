
CREATE OR REPLACE FUNCTION get_random_products(limit_count integer)
RETURNS SETOF products AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.products
  WHERE in_stock = true
  ORDER BY random()
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
