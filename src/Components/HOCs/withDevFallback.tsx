import React, {ComponentProps} from "react"
import {ErrorBoundary, FallbackProps} from "react-error-boundary"

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const stackArray = error.stack?.split("\n")

  return (
    <div role="alert" className="bg-red-200 p-2 pb-10 overflow-auto max-h-80">
      <p className="font-bold">Something went wrong:</p>
      <details>
        <summary>
          {error.name} {error.message}
          <br />
          <pre className="pl-4"> {stackArray![0]} </pre>
        </summary>
        <pre className="pl-6">{stackArray?.splice(1).join("\n")}</pre>
      </details>
      <button
        onClick={resetErrorBoundary}
        className="underline hover:text-blue-600"
      >
        Reset
      </button>
    </div>
  )
}

const withDevFallback = <T extends React.ElementType>(Element: T) =>
  (props: ComponentProps<T>) => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Element {...props} />
    </ErrorBoundary>)

export default withDevFallback