'use client';

import { useState } from 'react';
import Link from 'next/link';
import StepIndicator from '@/components/StepIndicator';
import ModuleA from '@/components/ModuleA';
import ModuleB from '@/components/ModuleB';
import ModuleC from '@/components/ModuleC';
import EligibilityResultCard from '@/components/EligibilityResult';
import { calculateEligibility } from '@/lib/eligibility';
import type {
  BasicInfo,
  ScreeningAnswers,
  ConsentData,
  EligibilityResult,
} from '@/types/donor';

type Step = 1 | 2 | 3 | 4;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [screeningAnswers, setScreeningAnswers] =
    useState<ScreeningAnswers | null>(null);
  const [eligibilityResult, setEligibilityResult] =
    useState<EligibilityResult | null>(null);
  const [donorId, setDonorId] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  function handleModuleA(data: BasicInfo) {
    setBasicInfo(data);
    setStep(2);
    window.scrollTo(0, 0);
  }

  function handleModuleB(data: ScreeningAnswers) {
    setScreeningAnswers(data);
    setStep(3);
    window.scrollTo(0, 0);
  }

  async function handleModuleC(consentData: ConsentData) {
    if (!basicInfo || !screeningAnswers) return;

    const result = calculateEligibility(
      basicInfo,
      screeningAnswers
    );

    setEligibilityResult(result);
    setSaving(true);
    setSaveError('');

    try {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basicInfo,
          screeningAnswers,
          consentData,
          eligibilityResult: result,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveError(
          data.error || 'Registration failed.'
        );
        setSaving(false);
        return;
      }

      setDonorId(data.id);
      setStep(4);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);

      setSaveError(
        'Unable to save registration. Please try again.'
      );
    }

    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-srm-900 text-white px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-srm-300">
              SRM Medical College Hospital & Research Centre
            </p>
            <p className="text-sm font-bold">
              Blood Donation Camp — Registration
            </p>
          </div>

          <Link
            href="/"
            className="text-srm-300 hover:text-white text-xs"
          >
            ✕ Exit
          </Link>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <StepIndicator current={step} />

        {saveError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            {saveError}
          </div>
        )}

        {step === 1 && (
          <ModuleA onNext={handleModuleA} />
        )}

        {step === 2 && basicInfo && (
          <ModuleB
            gender={basicInfo.gender}
            onNext={handleModuleB}
            onBack={() => {
              setStep(1);
              window.scrollTo(0, 0);
            }}
          />
        )}

        {step === 3 && basicInfo && (
          <ModuleC
            donorName={basicInfo.fullName}
            onNext={handleModuleC}
            onBack={() => {
              setStep(2);
              window.scrollTo(0, 0);
            }}
          />
        )}

        {step === 4 &&
          eligibilityResult &&
          basicInfo && (
            saving ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4 animate-pulse">
                  💾
                </div>
                <p className="text-gray-600">
                  Saving your registration…
                </p>
              </div>
            ) : (
              <EligibilityResultCard
                result={eligibilityResult}
                donor={basicInfo}
                donorId={donorId}
              />
            )
          )}
      </div>
    </main>
  );
}