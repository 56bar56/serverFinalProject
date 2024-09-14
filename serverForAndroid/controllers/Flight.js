import { MongoClient } from 'mongodb';
/*
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
*/

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
        //console.log(flights.length); // Logs the number of flights found
        res.status(200).json(flights);
    } catch (error) {
        console.error('Error filtering flights:', error);
        res.status(500).send('An error occurred while filtering flights');
    } finally {
        await client.close();
    }
};

export const sortFlights = async (req, res) => {
    try {
        const flights = req.body;  // List of flights sent from the client

        // Here, you can either use ChatGPT to sort the flights or implement custom logic to sort them
        // For demonstration, let's say you sort them by price (ascending)
        //console.log('got in to sort data(FLIGHT)');


        flights.sort((a, b) => a.price - b.price);  // Sorting by price (as an example)

        // Return sorted flights
        res.status(200).json(flights);
    } catch (err) {
        console.error("Error sorting flights: ", err);
        res.status(500).json({ message: 'Error sorting flights' });
    }
};
/*
export const sortFlights = async (req, res) => {
    try {
        const flights = req.body;

        console.log("Received flights:", flights);

        // Validate if flights is defined and is an array
        if (!flights || !Array.isArray(flights)) {
            return res.status(400).json({ success: false, error: 'Flights data is missing or invalid.' });
        }

        // Prepare the message for ChatGPT
        const message = flights.map(flight => (
            `Flight ${flight.flightNumber} from ${flight.departure} to ${flight.arrival} costs $${flight.price}.`
        )).join("\n");

        // Send a message to ChatGPT
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an expert travel assistant." },
                { role: "user", content: `Here is a list of flights: \n\n${message}\n\nPlease sort this list based on price and convenience.` }
            ],
        });

        // Send ChatGPT's response back to the client
        res.json({
            success: true,
            data: response.data.choices[0].message.content,
        });
    } catch (error) {
        console.error("Error communicating with ChatGPT:", error);
        res.status(500).json({ success: false, error: 'Failed to communicate with ChatGPT' });
    }
};
*/
