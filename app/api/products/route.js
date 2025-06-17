export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams({
      limit: searchParams.get('limit') || '10',
      cursor: searchParams.get('cursor') || '',
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
      filter: searchParams.get('filter') || ''
    });

    const response = await fetch(`http://127.0.0.1:5000/products?${params}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}