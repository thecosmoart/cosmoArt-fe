import {
    HowItWorks,
    HowItWorks__Step,
    HowItWorks__Steps
} from './HowItWorks.module.scss';

export default function HowItWorksComponent() {
    const steps = [
        {
            title: '1. Get Your Coins',
            content: 'Purchase coins by selecting a bundle or setting your own amount — full control over your budget.'
        },
        {
            title: '2. Sign Up & Complete Payment',
            content: 'Create your account and securely pay for your chosen package. Registration takes less than a minute.'
        },
        {
            title: '3. Coins Are Instantly Added',
            content: 'Once payment is confirmed, coins appear in your balance — ready to use right away.'
        },
        {
            title: '4. Describe Your Idea',
            content: 'Enter a detailed text prompt in English. The clearer your idea, the better and more creative the result.'
        },
        {
            title: '5. Pay with Coins',
            content: 'Use your coins to generate multiple AI-created images based on your prompt. Pick your favorite result.'
        },
        {
            title: '6. AI Creates Multiple Options',
            content: 'Save your artwork in high quality and use it freely — for personal or commercial projects.'
        },
    ]

    return (
        <div className={ HowItWorks }>
            <h2>How It Works</h2>
            <div className={ HowItWorks__Steps }>
                {
                    steps.map((step, index) => (
                        <div className={ HowItWorks__Step } key={ index }>
                            <h3>{ step.title }</h3>
                            <p>{ step.content }</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}