# Social Media Post Generator

A Next.js project that allows users to easily generate content for their social media posts using AI. This project provides AI-generated content cards and includes functionality for saving generated posts.

## Features

- **AI Content Generation**: Automatically generates engaging content for social media posts.
- **Responsive Design**: The project is built to be mobile-friendly and responsive.
- **Customizable**: Users can customize the generated content for different social media platforms.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for fast styling.
- **OpenAI API**: For generating the AI-driven content (if you're using GPT models).
- **React**: For building UI components.

## Getting Started

Follow these steps to set up the project on your local machine:

### Prerequisites

- Node.js (v14.x or higher)
- npm (or yarn) for managing dependencies

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/social-media-post-generator/master.git
    ```

2. Navigate into the project folder:
    ```bash
    cd social-media-post-generator
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```
   or if you're using yarn:
    ```bash
    yarn install
    ```

4. Create a `.env.local` file in the root of the project to store your environment variables (e.g., OpenAI API key, etc.):
    ```bash
    NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
    ```

5. Run the development server:
    ```bash
    npm run dev
    ```
    or with yarn:
    ```bash
    yarn dev
    ```

6. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

1. Generate a social media post by clicking the "Generate" button.
2. Customize the generated content as needed.

## Contributing

Feel free to fork the repository, submit issues, or make pull requests if you'd like to contribute to the project.

## License

This project is licensed under the MIT License and Nebius AI Studio - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/) for the framework
- [OpenAI](https://openai.com/) for providing the AI connectivity between application and model
- [Llama](meta-llama/Meta-Llama-3.1-70B-Instruct-fast) for generating content
- [Tailwind CSS](https://tailwindcss.com/) for easy styling


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

