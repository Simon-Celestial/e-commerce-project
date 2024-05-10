import styles from "./Loader.module.scss";
import {ThreeCircles} from "react-loader-spinner";
export const Loader = () => {
    return (
       <>
           <ThreeCircles
               visible={true}
               height="100"
               width="100"
               color="black"
               ariaLabel="three-circles-loading"
               wrapperStyle={{}}
               wrapperClass={styles.loaderWrapper}
           />
       </>
    )
}