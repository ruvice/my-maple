import React, { useEffect, useMemo, useState } from 'react'
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import ConfigView from './ConfigView'

const queryClient = new QueryClient()
function Config() {
    
    return (
        <QueryClientProvider client={queryClient}>
            <ConfigView />
        </QueryClientProvider>
    )
}

export default Config