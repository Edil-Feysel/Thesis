const Welcome = () => {
  return (
    <div>
      <h2>
        Wellcome Back Dear {JSON.parse(sessionStorage.getItem("autenthicate"))}
      </h2>
    </div>
  );
};

export default Welcome;
