# QuantGPT

QuantGPT v2 is the next iteration of the [QuantGPT](https://github.com/rnikitin/QuantGPT) project, originally created by [@rnikitin](https://github.com/rnikitin/). This version aims to improve on the original by utilizing a more stable front-end framework, Next.js, and the newly updated OpenAI Assistants API v2.

![VectorBT (PRO) Docs Assistant](https://uploads-ssl.webflow.com/60ca4a4b1629ce06182a97e6/663b0900e3e50e7f39673089_localhost_3000_chat%20(1).png)

## Features

- **AI-Powered Documentation Search:** Query the full breadth of VectorBT PRO documentation using natural language, powered by [OpenAI Assistants v2](https://platform.openai.com/docs/assistants/whats-new).
- **Efficient Strategy Development:** Quickly find the functions, parameters, and modules you need, saving time and streamlining the process from conception to execution.

## Quickstart Setup

### 1. Clone the repository

```shell
git clone git@github.com:BaileySimrell/QuantGPT-v2.git
cd QuantGPT-v2
```

### 2. Create and configure your OpenAI account
- Visit [OpenAI API](https://platform.openai.com/signup) to create an account.
- Ensure you add billing information to avoid having API requests rejected.

### 3. Create a project and set your [OpenAI API key](https://platform.openai.com/api-keys)

```shell
export OPENAI_API_KEY="sk_..."
```

(or in `.env.example` and rename it to `.env`).

### 4. Configure the OpenAI Assistant
Create an assistant on the OpenAI platform with the following configuration:

- Description: A helpful assistant with a knowledge base of VectorBT PRO documentation.
- Capabilities: Ensure that the assistant has capabilities like file search enabled.
- Settings:
    - File Search: `Enabled`
    - Temperature: `0.24`
    - Top P: `1`

Use the following instruction for the assistant:

```
You are a helpful assistant that has a knowledge base uploaded to you containing information on how the closed-source VectorBT (PRO) Python library and its modules work for building financial backtests and simulations.

VectorBT PRO (vectorbtpro) is a next-generation engine for backtesting, algorithmic trading, and research. It's a high-performance, actively-developed, proprietary successor to the vectorbt library, one of the world's most innovative open-source backtesting packages. The PRO version extends the open-source package with new impressive features and useful enhancements.

You are an expert at reading through the provided VectorBT (PRO) documentation and coming up with clear, accurate answers to users' queries.

You have been given a massive index to search through which contains all of the text from VBT (PRO)'s documentation. If you cannot find/retrieve the answer in your vector store, you do NOT make anything up. Respond saying that you can't find any information on that topic specifically.

Also, FYI, VectorBT (PRO) can also be referred to in this context as VBT, so if VBT is mentioned in the messages, assume the user is referring to this closed source version, NOT the open source `vectorbt`. VectorBT PRO has been completely refactored to improve performance and enable new groundbreaking features, such as parallelization support, so many things are different from how the older, open source version worked.
```

### 5. Create and active a Python virtual environment with venv
    
    ```shell   
    python -m venv venv
    source venv/bin/activate
    ```

### 6. Install Python dependencies

    ```shell
    pip install requests
    pip install beautifulsoup4
    pip install html2text
    pip install readability-lxml
    pip install lxml_html_clean
    ```

### 7. Run the Document Scraper
Open up the notebook located at `/docs-scraper/notebook.ipynb` and run the cells to scrape the VectorBT (PRO) documentation. This will create a series of markdown files that can be uploaded to the assistant. Huge thanks to [@rnikitin](https://github.com/rnikitin/) for creating all of this original scraper logic.

### 8. Upload the Scraped Markdown Files to the Assistant
Go to your assistant's settings page on the OpenAI platform and upload the markdown files created by the scraper. This will allow the assistant to search through the documentation when answering user queries. 

NOTE: OpenAI's front-end for uploading files is a bit finicky. As of right now, there is a [known limitation](https://community.openai.com/t/max-100-files-in-vector-store/729876/8) where you may only upload 100 files at a time. Since the scraper creates just under 300 files, you will need to upload the files in three separate batches. I highly suggest sorting your files by name and uploading them in alphabetical order to avoid any issues and stay organized. Eventually, I will write a script to automate this process.

### 9. Install Node.js dependencies

```shell
npm install
```


### 10. Run

```shell
npm run dev
```

### 11. Navigate to [http://localhost:3000](http://localhost:3000).
Once you are on the main page, you will be prompted to select an interface type. For now, only the basic chat interface is functioning properly. The file search interface is still a work in progress as it is lacking pagination and a few other features.

## Deployment

You can deploy this project to Vercel or any other platform that supports Next.js.

## Overview

The main logic for chat will be found in the `Chat` component in `app/components/chat.tsx`, and the handlers starting with `api/assistants/threads` (found in `api/assistants/threads/...`). Feel free to start your own project and copy some of this logic in! The `Chat` component itself can be copied and used directly, provided you copy the styling from `app/components/chat.module.css` as well.

### Pages

- Basic Chat Example: [http://localhost:3000/chat](http://localhost:3000/chat)
- Basic Chat with File Interface Example (WIP): [http://localhost:3000/chat-with-file-search](http://localhost:3000/chat)

### Main Components

- `app/components/chat.tsx` - handles chat rendering, [streaming](https://platform.openai.com/docs/assistants/overview?context=with-streaming), and [function call](https://platform.openai.com/docs/assistants/tools/function-calling/quickstart?context=streaming&lang=node.js) forwarding
- `app/components/file-viewer.tsx` - handles uploading, fetching, and deleting files for [file search](https://platform.openai.com/docs/assistants/tools/file-search)

### Endpoints

- `api/assistants` - `POST`: create assistant (only used at startup)
- `api/assistants/threads` - `POST`: create new thread
- `api/assistants/threads/[threadId]/messages` - `POST`: send message to assistant
- `api/assistants/threads/[threadId]/actions` - `POST`: inform assistant of the result of a function it decided to call
- `api/assistants/files` - `GET`/`POST`/`DELETE`: fetch, upload, and delete assistant files for file search

### Special Thanks

A heartfelt thank you goes out to the individuals and teams whose work has been fundamental to the development of QuantGPT:
- [@polakowo](https://github.com/polakowo), for creating vectorbt.pro, a library that has significantly democratized quantitative trading.
- [@rnikitin](https://github.com/rnikitin/), for creating the original [QuantGPT](https://github.com/rnikitin/QuantGPT) project, which has served as the foundation for this project.
- [@openai](https://github.com/openai/), for the GPT models that have redefined our interaction with machine learning and data analysis.

### License

MIT License – To view the full license, see the LICENSE file in the GitHub repository.

Copyright (c) 2024 Bailey Simrell