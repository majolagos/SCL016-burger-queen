import { createContext } from "react";

const userContext = createContext({
    name: null,
    updateName: () => {}
})

export default userContext;