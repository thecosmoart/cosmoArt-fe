import { LoaderCircle } from 'lucide-react';

import {
    Loader,
    Loader__Wrapper
} from './Loader.module.scss';

export default function LoaderComponent() {
    return (
        <div className={ Loader }>
            <div className={ Loader__Wrapper }>
                <LoaderCircle />
            </div>
        </div>
    );
}
