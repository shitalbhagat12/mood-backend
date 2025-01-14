const dotenv = require('dotenv');
 dotenv.config();

// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash-exp",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run(message) {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   });

//   try {
//     const result = await chatSession.sendMessage(
//       `What is the mood of "${message}"? Give me responses in JSON format with two keys: "mood" and "suggestions". Only provide a JSON object.`
//     );

//     console.log("Gemini Response Object:", result);

//     const responseText = await result.response.text();

//     console.log("Response Text:", responseText);
    
//     const cleanedResponse = responseText.replace(/```json|```/g, "").trim();

//     console.log("Cleaned Response:", cleanedResponse);

//     const parsedResponse = JSON.parse(cleanedResponse);

//     console.log("Parsed Response:", parsedResponse);

//     return parsedResponse; 
//   } catch (err) {
//     console.error("Failed to parse Gemini response:", err);
//     //return { mood: "Unknown", suggestions: ["No suggestions available"] }; 
//   }
// }



// module.exports = run;


// //run();


const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(message) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  try {
        const result = await chatSession.sendMessage(
          `What is the mood of "${message}"? Give me responses in JSON format with two keys: "mood" and "suggestions". Only provide a JSON object.`
        );
    
        console.log("Gemini Response Object:", result);
    
        const responseText = await result.response.text();
    
        console.log("Response Text:", responseText);
        
        const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
    
        console.log("Cleaned Response:", cleanedResponse);
    
        const parsedResponse = JSON.parse(cleanedResponse);
    
        console.log("Parsed Response:", parsedResponse);
    
        return parsedResponse; 
      } catch (err) {
        console.error("Failed to parse Gemini response:", err);
        return { mood: "Unknown", suggestions: ["No suggestions available"] }; 
      }
}

module.exports = run;
//run();