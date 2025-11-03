'use client';

import { useRef, useState } from 'react';

import {
    ImageGenerator,
    ImageGenerator__Images,
    ImageGenerator__Images__ImageContainer
} from './ImageGenerator.module.scss';

import InputTextComponent from '@/components/InputText';
import LoaderComponent from '@/components/Loader';
import { useNotification } from '@/stores/Notification.store';
import { fetchAPI } from '@/utils/api';

export default function ImageGeneratorComponent() {
    const [images, setImages] = useState([]);
    const ref = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const { addNotification } = useNotification();

    const handleGenerate = async () => {
        try {
            setIsLoading(true);
            const value = ref.current.value;

            if (!value) {
                addNotification({
                    type: 'error',
                    message: 'Please enter a prompt'
                });
                setIsLoading(false);

                return;
            }

            const result = await fetchAPI('/generate-images', null, {
                body: JSON.stringify({
                    prompt: value
                }),
                method: 'POST'
            });

            setImages(result.data.map((url) => {
                const urlObject = new URL(url);

                return `/generated${urlObject.pathname}?${urlObject.searchParams.toString()}`;
            }));
        } catch (e) {
            console.error('Error generating images:', e);
            addNotification({
                type: 'error',
                message: 'An error occurred while generating images'
            });
        }

        setIsLoading(false);
    };

    const handleDownload = async () => {
        for (const link of images) {
            try {
                const response = await fetch(link);
                const blobImage = await response.blob();
                const href = URL.createObjectURL(blobImage);
                const anchorElement = document.createElement('a');

                anchorElement.href = href;
                anchorElement.download = link.split('/').pop();

                document.body.appendChild(anchorElement);
                anchorElement.click();

                document.body.removeChild(anchorElement);
                window.URL.revokeObjectURL(href);
            } catch (e) {
                console.error('Error downloading image:', e);
            }
        }
    };
    
    return (
        <div className={ ImageGenerator }>
            { isLoading && <LoaderComponent /> }
            <InputTextComponent ref={ ref } placeholder="Describe  your idea..." />
            <button onClick={ handleGenerate }>Generate</button>
            {
                images.length > 0 && (
                    <>
                        <div className={ ImageGenerator__Images }>
                            {
                                images.map((image, index) => (
                                    <div key={ index } className={ ImageGenerator__Images__ImageContainer }>
                                        { /* eslint-disable-next-line @next/next/no-img-element */ }
                                        <img src={ image } alt="Generated image" />
                                    </div>
                                ))
                            }
                        </div>
                        <button onClick={ handleDownload }>Download</button>
                    </>
                )
            }
        </div>
    );
}
