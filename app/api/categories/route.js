export async function GET() {
  try {
    const response = await fetch('http://127.0.0.1:5000/categories');
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}