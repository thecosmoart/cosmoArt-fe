import {
    WhyUs,
    WhyUs__Wrapper,
    WhyUs__Image
} from './WhyUs.module.scss';

export default function WhyUsComponent() {
    return (
        <div className={ WhyUs__Wrapper }>
            <div className={ WhyUs__Image }/>
            <div className={ WhyUs }>
                <p>Why Coins?</p>
                <p>
                    Using coins keeps everything simple, transparent, and flexible — no subscriptions, no hidden fees.
                </p>
                <ul>
                    <li>Instant access after payment</li>
                    <li>One wallet for all your creations</li>
                    <li>Easy balance tracking in your account</li>
                </ul>
            </div>
        </div>
    );
}
