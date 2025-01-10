export const fetchData = async (endpointFetch) => {
    try {
      const data = await endpointFetch;
      // Kiểm tra nếu data không phải là một mảng, thì chuyển đổi nó thành mảng
      const Array = Array.isArray(data) ? data : [data]; 
      setProducts(productsArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };