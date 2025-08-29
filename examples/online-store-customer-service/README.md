![Demo Online Store (TechBay) Customer Service Chatbot by ⌘ Langbase][cover]

![License: MIT][mit] [![Fork to ⌘ Langbase][fork]][pipe-main-chatbot]

## Build an Online Store (TechBay) Customer Service Chatbot with Pipes — ⌘ Langbase

This chatbot is built by using an multiple AI Pipes (Chatbot agents) on Langbase, it works with 30+ LLMs (OpenAI, Gemini, Mistral, Llama, Gemma, etc), any Data (10M+ context with Memory sets), and any Framework (standard web API you can use with any software).


Check out the live demo [here][demo].

## Features

- 💬 [Online Store (TechBay) Customer Service Chatbot][demo] — Built with an [AI Pipe on ⌘ Langbase][pipe-main-chatbot]
- ⚡️ Streaming — Real-time chat experience with streamed responses
- 🗣️ Q/A — Ask questions and get pre-defined answers with your preferred AI model and tone
- 🔋 Responsive and open source — Works on all devices and platforms



## Learn more

1. Take a look at the main chatbot pipe that routes call for other departments in the online store [Online Store (TechBay) Customer Service Main Chatbot Pipe on ⌘ Langbase][pipe-main-chatbot]
2. Take a look at the electronics section pipe of the demo online store chatbot that classifies routed customer query into three categories i.e, 1. Support, Feedback, Complaint. 2. Order Tracking. 3. Refund/Exchange. [Online Store (TechBay) Customer Service Electronics Department Agent Pipe on ⌘ Langbase][pipe-electronics-dept]
3. Take a look at the sports gear section pipe of the demo online store chatbot that classifies routed customer query into three categories i.e, 1. Support, Feedback, Complaint. 2. Order Tracking. 3. Refund/Exchange. [Online Store (TechBay) Customer Service Sports Gear Department Agent Pipe on ⌘ Langbase][pipe-electronics-dept]
4. Take a look at the travel bags section pipe of the demo online store chatbot that classifies routed customer query into three categories i.e, 1. Support, Feedback, Complaint. 2. Order Tracking. 3. Refund/Exchange. [Online Store (TechBay) Customer Service Travel Bags Department Agent Pipe on ⌘ Langbase][pipe-electronics-dept]
2. Read the [source code on GitHub][gh] for this example
3. Go through Documentaion: [Pipe Quick Start][qs]
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs]


## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the [Online Store (TechBay) Customer Service Main Chatbot Pipe][pipe-main-chatbot] Pipe on ⌘ Langbase.
2. Fork the [Online Store (TechBay) Customer Service Sports Gear Department Agent Pipe][pipe-sports-gear] Pipe on ⌘ Langbase.
3. Fork the [Online Store (TechBay) Customer Service Electronics Department Agent Pipe][pipe-electronics-dept] Pipe on ⌘ Langbase.
4. Fork the [Online Store (TechBay) Customer Service Travel Bags Department Agent Pipe][pipe-travel-bags-dept] Pipe on ⌘ Langbase.
5. Go to the API tab to copy the Pipe's API key (to be used on server-side only).
6. Download the example project folder from [here][download] or clone the reppository.
7. `cd` into the online-cs-chatbot-backend directory and open it in your code editor.
8. Duplicate the `.dev.var.example` file in this project and rename it to `.dev.vars`.
9. Add the following environment variables (.dev.vars):
```
    # Replace `PIPE_API_KEY` with the copied API key.
    LANGBASE_ONLINE_STORE_CUSTOMER_SERVICE_API_KEY="PIPE_API_KEY"
    LANGBASE_TRAVEL_PIPE_API_KEY="PIPE_API_KEY"
    LANGBASE_ELECTRONICS_PIPE_API_KEY="PIPE_API_KEY"
    LANGBASE_SPORTS_PIPE_API_KEY="PIPE_API_KEY"
```    

10. Issue the following in your CLI separately for online-cs-chatbot directory (frontend of the chatbot) and online-cs-chatbot-backend directory (backend of the chatbot) :
```sh
    # Install the dependencies using the following command:
    npm install

    # Run the project using the following command:
    npm run dev
``` 

11. Your app template (frontend of the chatbot) should now be running on [localhost:3000][localfrontend].

> NOTE:
> This is a Next.js project, so you can build and deploy it to any platform of your choice, like Vercel, Netlify, Cloudflare, etc.

12. Your backend which is a cloudflare worker should now be running on [localhost:8787][localbackend].

> NOTE:
> This project requires cloudflare account so that cloudflare CLI [Cloudflare CLI account and setup][cloudflare]

13. To test the classification and function call you can the following test dataset:
```
Electronic Dept. Query:
    I order 2 days ago a new Sony Bravia XR-65X90L, I did recieve confirmation that my order will be shipped shortly but I have not recieve any tracking number or any confirmation that the order has been disptachen. Please reply soon as I order because you guys ship fast and it should not take more then a week.  

Travel Bags Dept. Query:
    I have received Wenger backpack for 15 inch laptop two days ago, however it quite small for my use case. I want return and order new Wenger 30L for 16inch laptop. Let me know if it is in stock? 

Sports Gear Dept. Query:
    I bought Nike zoomx two days ago, although I received the order confirmation and the receipt but I have not received the tracking number. Please send the tracking number asap.
```

## Authors

This project is created by [Langbase][lb] team members, with contributions from:

- Muhammad-Ali Danish - Software Engineer, [Langbase][lb] <br>
**_Built by ⌘ [Langbase.com][lb] — Ship hyper-personalized AI assistants with memory!_**

[cover]:https://raw.githubusercontent.com/LangbaseInc/docs-images/main/examples/online-store-customer-service/online-store-customer-service.png
[lb]: https://langbase.com
[demo]: https://online-store-customer-service.langbase.dev
[pipe-main-chatbot]: https://beta.langbase.com/examples/online-store-customer-service
[pipe-electronics-dept]: https://beta.langbase.com/examples/online-store-electronics-dept
[pipe-travel-bags-dept]: https://beta.langbase.com/examples/online-store-travel-bags-dept
[pipe-sports-gear]: https://beta.langbase.com/examples/online-store-sports-gear-dept
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/online-store-customer-service
[download]:https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/online-store-customer-service
[qs]:https://langbase.com/docs/pipe/quickstart
[docs]:https://langbase.com/docs
[local]:http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
[localfrontend]:http://localhost:3000
[localbackend]:http://localhost:8787
[cloudflare]:https://developers.cloudflare.com/workers/get-started/guide/