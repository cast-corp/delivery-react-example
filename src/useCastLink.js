import { useEffect, useState } from "react";

const useCastLink = (projectId, contactId, apiKey) => {
  const [castLinkState, setCastLinkState] = useState({});

  useEffect(() => {
    if (
      castLinkState.loaded &&
      castLinkState.projectId === projectId &&
      castLinkState.contactId === contactId &&
      castLinkState.apiKey === apiKey
    ) {
      return;
    }

    const load = async () => {
      const options = {
        method: "POST",
        headers: { Authorization: "Bearer " + apiKey },
        body: JSON.stringify({ cast_id: projectId, contact_id: contactId }),
      };
      let link;
      let error;
      try {
        const response = await fetch(
          "https://cast.app/designer/api/v1/permalink",
          options
        );
        const body = await response.text();
        if (response.ok) {
          link = body;
        } else {
          console.error(body);
          error = body;
        }
      } catch (err) {
        console.log(err);
        error = err.message;
      }
      setCastLinkState({
        apiKey,
        contactId,
        error,
        link,
        loaded: true,
        projectId,
      });
    };

    load();
  }, [apiKey, castLinkState, contactId, projectId]);

  return castLinkState;
};

export default useCastLink;
