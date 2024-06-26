import styles from "./Loader.module.scss";
import { Watch} from "react-loader-spinner";
export const Loader = () => {
    return (
       <>
           <Watch
               visible={true}
               height="100"
               width="100"
               radius="48"
               color="gray"
               ariaLabel="watch-loading"
               wrapperStyle={{}}
               wrapperClass={styles.loaderWrapper}
           />
       </>
    )
}