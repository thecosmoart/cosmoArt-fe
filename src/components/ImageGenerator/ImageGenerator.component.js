'use client';

import { useRef, useState } from 'react';

import {
    ImageGenerator,
    ImageGenerator__Images,
    ImageGenerator__Images__ImageContainer
} from './ImageGenerator.module.scss';

import InputTextComponent from '@/components/InputText';
import { fetchAPI } from '@/utils/api';

export default function ImageGeneratorComponent() {
    const [images, setImages] = useState([]);
    const ref = useRef();

    const handleGenerate = async () => {
        const value = ref.current.value;

        const result = await fetchAPI('/generate-images', null, {
            body: JSON.stringify({
                prompt: value,
            }),
            method: 'POST'
        });

        setImages(result.data);
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
