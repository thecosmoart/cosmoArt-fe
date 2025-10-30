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
    const [images, setImages] = useState([
    ]);
    const ref = useRef();

    const handleGenerate = async () => {
        const value = ref.current.value;

        const result = await fetchAPI(`/api/generate-image?text=${value}`);

        setImages(result);
    };

    const handleDownload = () => {
        for (const [index, link] of images.entries()) {
            const element = document.createElement('a');
            element.href = link;
            element.download = `${index}.${link.split('.').pop()}`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
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
