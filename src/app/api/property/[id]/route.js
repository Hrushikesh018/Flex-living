import { fetchAndNormalizeData } from '@/app/lib/hostaway';
import { NextResponse } from 'next/server';


export async function GET(request, { params }) {
    try {
        const { id } = await params;


        const allReviews = await fetchAndNormalizeData();
        console.log(allReviews);


        const filtered = allReviews.filter(r => String(r.id) === String(id));

        return NextResponse.json(filtered);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}