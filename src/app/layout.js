import '@/styles/styles.scss';

import FooterComponent from '@/components/Footer';
import HeaderComponent from '@/components/Header';
import NotificationsComponent from '@/components/Notifications';

export const metadata = {
    title: 'CosmoArt',
    description: 'CosmoArt'
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
                />
            </head>
            <body>
                <HeaderComponent />
                <NotificationsComponent />
                <main>
                    <div className="page-wrapper">
                        { children }
                    </div>
                </main>
                <FooterComponent />
            </body>
        </html>
    );
}
