import Loadable from 'react-loadable';
import LoadingSpin from '../components/LoadingSpin'

const setLoadable = (loader) => {
    return Loadable({
        loader,
        loading:LoadingSpin,
    });
}

export default setLoadable