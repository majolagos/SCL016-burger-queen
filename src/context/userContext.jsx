import { createContext } from "react";

const userContext = createContext({
    name: null,
    // setName: () => {}
})

export default userContext;