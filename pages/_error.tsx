interface IError {
  message?: string;
  statusCode: number;
}

function Error({statusCode, message}: IError) {
  return (
    <div className="fullCenter">
      <p>
        {message != null
          ? <>{message}</>
          : (statusCode)
            ? `Unexpected Error (${statusCode})`
            : 'An error occurred on the client'}
      </p>
    </div>
  )
}

Error.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return {statusCode}
}

export default Error
