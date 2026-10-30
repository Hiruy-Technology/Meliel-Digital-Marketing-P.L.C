"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { placeholderLabel } from "@/lib/placeholder";

type MapFacadeProps = {
  /** Google Maps embed URL from Site Settings; null until the client sends the map pin. */
  url: string | null;
  /** Placeholder text shown while there is no URL. */
  pendingLabel: string;
};

const FRAME = "aspect-[4/3] w-full rounded-sm sm:aspect-[21/9]";

// Click-to-load map: Google Maps is heavy, so nothing loads until a visitor asks for it.
export function MapFacade({ url, pendingLabel }: MapFacadeProps) {
  const [loaded, setLoaded] = useState(false);

  if (!url) {
    return (
      <PlaceholderImage label={placeholderLabel(pendingLabel)} aspect={FRAME} />
    );
  }

  if (loaded) {
    return (
      <iframe
        src={url}
        title="Meliel Digital Marketing office location on Google Maps"
        referrerPolicy="no-referrer-when-downgrade"
        className={`${FRAME} border-0 bg-navy-50`}
      />
    );
  }

  return (
    <div className={`${FRAME} flex items-center justify-center bg-navy-50 p-6`}>
      <div className="text-center">
        <Icon name="map-pin" className="mx-auto size-8 text-navy-700" />
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => setLoaded(true)}
        >
          Show map
        </Button>
      </div>
    </div>
  );
}
