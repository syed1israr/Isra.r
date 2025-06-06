'use client'

import { Error_state } from "@/components/Error-state"

const ErrorPage = () => {
    return(
        <Error_state
        title="Error"
        description="An error occurred while loading the agents."
        />
    )
}

export default ErrorPage;