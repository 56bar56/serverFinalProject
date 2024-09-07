import { MongoClient } from 'mongodb';

export const filterFlights = async (req, res) => {
    const { maxPrice, departureLocation, arrivalLocation, departureDate, arrivalDate } = req.body;
    const client = new MongoClient('mongodb://127.0.0.1:27017');

    try {
        await client.connect();
        const db = client.db("travelApp");
        const flightsCollection = db.collection("flights");

        // Build the query object using regex for locations and string comparisons for dates
        let query = {};

        // Max price filter
        if (maxPrice !== undefined && maxPrice !== "") {
            query.price = { $lte: maxPrice };
        }

        // Departure location filter (case-insensitive)
        if (departureLocation !== undefined && departureLocation !== "") {
            query.departure = { $regex: new RegExp(departureLocation, 'i') };
        }

        // Arrival location filter (case-insensitive)
        if (arrivalLocation !== undefined && arrivalLocation !== "") {
            query.arrival = { $regex: new RegExp(arrivalLocation, 'i') };
        }

        // Takeoff date filter (compare as string)
        if (departureDate !== undefined && departureDate !== "") {
            query.takeoff = { $gte: `${departureDate}T00:00:00` };
        }

        // Landing date filter (compare as string)
        if (arrivalDate !== undefined && arrivalDate !== "") {
            query.landing = { $lte: `${arrivalDate}T00:00:00` };
        }

        //console.log('Query:', query);

        const flights = await flightsCollection.find(query).toArray();
        console.log(flights.length); // Logs the number of flights found
        res.status(200).json(flights);
    } catch (error) {
        console.error('Error filtering flights:', error);
        res.status(500).send('An error occurred while filtering flights');
    } finally {
        await client.close();
    }
};
