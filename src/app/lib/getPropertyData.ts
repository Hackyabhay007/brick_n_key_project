export async function getPropertyData(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`);
        const data = await response.json();
        return data?.data?.[0];
    } catch (error) {
        console.error('Error fetching property data:', error);
        return null;
    }
}
