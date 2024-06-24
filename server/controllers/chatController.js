const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chatController = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
    });
    res.json({ reply: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = chatController;
