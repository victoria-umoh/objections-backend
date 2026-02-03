const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateRebuttal = async (req, res) => {
  const { objection, tone } = req.body;

  if (!objection) {
    return res.status(400).json({ error: "Objection text is required" });
  }

  // Check if API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.length < 20) {
    return res.status(500).json({ 
      error: "OpenAI API key is not properly configured. Please add a valid OPENAI_API_KEY to your .env file." 
    });
  }

  try {
    const prompt = `You are a world-class life insurance sales mentor. Generate a ${tone} rebuttal for this objection: "${objection}". Keep it under 40 words, conversational, and end with a soft-close question.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.status(200).json({
      script: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    
    // If quota exceeded, provide helpful fallback
    if (error.status === 429) {
      return res.status(503).json({ 
        error: "AI service temporarily unavailable due to quota limits.",
        message: "Please use the pre-written scripts or add credits to your OpenAI account.",
        fallback: "Please refer to the pre-written calm, confident, and close scripts for this objection."
      });
    }
    
    res.status(500).json({ 
      error: "Failed to generate AI script.",
      details: error.message 
    });
  }
};