"use client"

import { useMaintenanceCalculator } from "@/modules/maintenance/hooks/useMaintenanceCalculator";
import { MaintenanceCalculator } from "@/modules/maintenance/ui/MaintenanceCalculator";
import { translations } from "@/modules/maintenance/domain/translations";
import { Region } from "@/modules/maintenance/domain/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  region: Region;
}

export function MaintenanceCalculatorWrapper({ region }: Props) {
  const router = useRouter();
  const calculator = useMaintenanceCalculator();
  const t = translations[region];

  // Sync internal region state with URL param
  useEffect(() => {
    if (calculator.input.region !== region) {
      calculator.updateRegion(region);
    }
  }, [region]);

  const handleRegionChange = (newRegion: Region) => {
    router.push(`/${newRegion}`);
  };

  return (
    <MaintenanceCalculator 
      {...calculator} 
      t={t} 
      updateRegion={handleRegionChange} 
    />
  );
}
