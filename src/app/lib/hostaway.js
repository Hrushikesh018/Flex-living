
import fs from 'fs';
import path from 'path';

export async function fetchAndNormalizeData() {
    const ACCOUNT_ID = process.env.HOSTAWAY_ACCOUNT_ID;
    const API_KEY = process.env.HOSTAWAY_API_KEY;

    console.log("🚀 Review Engine: Starting fetch sequence...");


    const tokenRes = await fetch('https://api.hostaway.com/v1/accessTokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: ACCOUNT_ID,
            client_secret: API_KEY,
            scope: 'general'
        })
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
        console.error("❌ Auth Error: Could not get access token. Check your .env keys.");
        return [];
    }
    console.log("✅ Auth Success: Token received.");


    const reviewsRes = await fetch('https://api.hostaway.com/v1/reviews', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });

    const hostawayData = await reviewsRes.json();
    const apiResult = hostawayData.result || [];
    console.log(`📡 API Response: Received ${apiResult.length} raw reviews from Hostaway.`);


    const mockData = [
        {
            id: 7453,
            type: "host-to-guest",
            publicReview: "Shane and family are wonderful! Would definitely host again :)",
            reviewCategory: [
                { category: "cleanliness", rating: 10 },
                { category: "communication", rating: 10 },
                { category: "respect_house_rules", rating: 10 }
            ],
            submittedAt: "2024-08-21 22:45:14",
            guestName: "Shane Finkelstein",
            listingName: "2B N1 A - 29 Shoreditch Heights",
            channel: "airbnb"
        },
        {
            id: 8821,
            type: "guest-to-host",
            publicReview: "Amazing stay, very clean and central.",
            reviewCategory: [
                { category: "cleanliness", rating: 9 },
                { category: "communication", rating: 8 }
            ],
            submittedAt: "2024-11-10 10:20:00",
            guestName: "Alice Cooper",
            listingName: "City Penthouse",
            channel: "google"
        },

        {
            id: 9001,
            type: "guest-to-host",
            publicReview: "The apartment was spotless and exactly as described.",
            reviewCategory: [
                { category: "cleanliness", rating: 10 },
                { category: "communication", rating: 9 }
            ],
            submittedAt: "2024-09-05 14:30:00",
            guestName: "Rahul Mehta",
            listingName: "Studio B - Canary Wharf",
            channel: "airbnb"
        },
        {
            id: 9002,
            type: "guest-to-host",
            publicReview: "Great location, easy check-in, and responsive host.",
            reviewCategory: [
                { category: "communication", rating: 9 },
                { category: "cleanliness", rating: 8 }
            ],
            submittedAt: "2024-09-12 09:15:00",
            guestName: "Emily Watson",
            listingName: "Central Soho Apartment",
            channel: "booking"
        },
        {
            id: 9003,
            type: "guest-to-host",
            publicReview: "Comfortable stay, but parking was a bit tricky.",
            reviewCategory: [
                { category: "cleanliness", rating: 8 },
                { category: "communication", rating: 8 }
            ],
            submittedAt: "2024-09-18 18:40:00",
            guestName: "Mark Johnson",
            listingName: "Greenwich Riverside Flat",
            channel: "google"
        },
        {
            id: 9004,
            type: "guest-to-host",
            publicReview: "Loved the interiors and the view from the balcony!",
            reviewCategory: [
                { category: "cleanliness", rating: 9 },
                { category: "communication", rating: 9 }
            ],
            submittedAt: "2024-10-01 11:00:00",
            guestName: "Sofia Alvarez",
            listingName: "River View Luxe Apartment",
            channel: "airbnb"
        },
        {
            id: 9005,
            type: "guest-to-host",
            publicReview: "Smooth experience overall. Will book again.",
            reviewCategory: [
                { category: "cleanliness", rating: 8 },
                { category: "communication", rating: 9 }
            ],
            submittedAt: "2024-10-07 16:25:00",
            guestName: "Daniel Smith",
            listingName: "Modern 1BHK - Hackney",
            channel: "booking"
        },
        {
            id: 9006,
            type: "guest-to-host",
            publicReview: "Nice place, very close to public transport.",
            reviewCategory: [
                { category: "cleanliness", rating: 8 },
                { category: "communication", rating: 7 }
            ],
            submittedAt: "2024-10-14 08:10:00",
            guestName: "Ananya Gupta",
            listingName: "East London Studio",
            channel: "google"
        },
        {
            id: 9007,
            type: "guest-to-host",
            publicReview: "The host was very helpful throughout the stay.",
            reviewCategory: [
                { category: "communication", rating: 10 },
                { category: "cleanliness", rating: 9 }
            ],
            submittedAt: "2024-10-20 20:05:00",
            guestName: "Michael Brown",
            listingName: "Paddington Serviced Apartment",
            channel: "airbnb"
        },
        {
            id: 9008,
            type: "guest-to-host",
            publicReview: "Good value for money, clean and well-maintained.",
            reviewCategory: [
                { category: "cleanliness", rating: 9 },
                { category: "communication", rating: 8 }
            ],
            submittedAt: "2024-10-28 13:50:00",
            guestName: "Priya Nair",
            listingName: "Budget Studio - Wembley",
            channel: "booking"
        },
        {
            id: 9009,
            type: "guest-to-host",
            publicReview: "Everything was perfect, highly recommended!",
            reviewCategory: [
                { category: "cleanliness", rating: 10 },
                { category: "communication", rating: 10 }
            ],
            submittedAt: "2024-11-02 19:30:00",
            guestName: "Chris Evans",
            listingName: "Luxury City Penthouse",
            channel: "google"
        },
        {
            id: 9010,
            type: "guest-to-host",
            publicReview: "Decent stay, minor issues but resolved quickly.",
            reviewCategory: [
                { category: "cleanliness", rating: 7 },
                { category: "communication", rating: 9 }
            ],
            submittedAt: "2024-11-06 10:45:00",
            guestName: "Neha Sharma",
            listingName: "1BHK Near King’s Cross",
            channel: "airbnb"
        },
        {
            id: 9011,
            type: "guest-to-host",
            publicReview: "Loved the neighborhood and the apartment vibe.",
            reviewCategory: [
                { category: "cleanliness", rating: 9 },
                { category: "communication", rating: 8 }
            ],
            submittedAt: "2024-11-12 17:00:00",
            guestName: "Oliver Stone",
            listingName: "Camden Town Flat",
            channel: "booking"
        },
        {
            id: 9012,
            type: "guest-to-host",
            publicReview: "Very responsive host and seamless check-in.",
            reviewCategory: [
                { category: "communication", rating: 10 },
                { category: "cleanliness", rating: 8 }
            ],
            submittedAt: "2024-11-18 21:10:00",
            guestName: "Kunal Verma",
            listingName: "Serviced Apartment - Stratford",
            channel: "google"
        },
        {
            id: 9013,
            type: "guest-to-host",
            publicReview: "Clean, comfortable, and quiet. Perfect for work trips.",
            reviewCategory: [
                { category: "cleanliness", rating: 9 },
                { category: "communication", rating: 9 }
            ],
            submittedAt: "2024-11-22 09:40:00",
            guestName: "Sarah Thompson",
            listingName: "Business Studio - Docklands",
            channel: "airbnb"
        },
        {
            id: 9014,
            type: "guest-to-host",
            publicReview: "Good amenities, WiFi was strong.",
            reviewCategory: [
                { category: "cleanliness", rating: 8 },
                { category: "communication", rating: 8 }
            ],
            submittedAt: "2024-11-26 14:55:00",
            guestName: "Amit Patel",
            listingName: "Smart Studio - Croydon",
            channel: "booking"
        },
        {
            id: 9015,
            type: "guest-to-host",
            publicReview: "Pleasant stay, would recommend to others.",
            reviewCategory: [
                { category: "cleanliness", rating: 9 },
                { category: "communication", rating: 9 }
            ],
            submittedAt: "2024-11-30 12:15:00",
            guestName: "Laura Wilson",
            listingName: "Cozy Flat - Kensington",
            channel: "google"
        }
    ];
    const rawItems = [...apiResult, ...mockData];
    console.log(`📦 Data Pool: Total of ${rawItems.length} items to normalize (API + Mock).`);


    let approvals = [];
    try {
        const filePath = path.join(process.cwd(), 'data', 'reviews.json');
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            approvals = JSON.parse(fileContent || '[]');
            console.log(`💾 Persistence: Loaded ${approvals.length} existing approval states.`);
        } else {
            console.warn("⚠️ Persistence: reviews.json not found, using empty approvals.");
        }
    } catch (e) {
        console.error("❌ Persistence Error:", e.message);
    }

    const normalized = rawItems.map((item, index) => {
        try {
            const catAvg = item.reviewCategory
                ? item.reviewCategory.reduce((acc, c) => acc + c.rating, 0) / item.reviewCategory.length
                : 10;

            const saved = approvals.find(a => String(a.id) === String(item.id));

            return {
                id: item.id,
                guestName: item.guestName || "Anonymous Guest",
                listingName: item.listingName || "Premium Residence",
                date: item.submittedAt || new Date().toISOString(),
                comment: item.publicReview || "No comment provided.",
                rating: Math.round(catAvg / 2) || 5,
                source: item.channel || 'hostaway',
                isApproved: saved ? saved.isApproved : false,
                categories: {
                    cleanliness: item.reviewCategory?.find(c => c.category === 'cleanliness')?.rating || 0,
                }
            };
        } catch (mapError) {
            console.error(`❌ Mapping Error at index ${index}:`, mapError.message);
            return null;
        }
    }).filter(item => item !== null);

    console.log(`✨ Finalization: Outputting ${normalized.length} normalized reviews.`);
    return normalized;
}