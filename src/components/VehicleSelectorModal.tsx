import React, { useState } from 'react';
import { X, CheckCircle2, Car, AlertCircle, Trash2, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_YEARS, VEHICLE_DATABASE } from '../data/mockVehicles';
import { Vehicle } from '../types';

interface VehicleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VehicleSelectorModal: React.FC<VehicleSelectorModalProps> = ({ isOpen, onClose }) => {
  const { activeVehicle, setActiveVehicle, user, addUserVehicle } = useApp();

  const [selectedYear, setSelectedYear] = useState<number | ''>(activeVehicle?.year || '');
  const [selectedMake, setSelectedMake] = useState<string>(activeVehicle?.make || '');
  const [selectedModel, setSelectedModel] = useState<string>(activeVehicle?.model || '');
  const [selectedTrim, setSelectedTrim] = useState<string>(activeVehicle?.trim || '');
  const [saveToGarage, setSaveToGarage] = useState<boolean>(true);

  if (!isOpen) return null;

  const availableMakes = selectedYear ? Object.keys(VEHICLE_DATABASE) : [];
  const makeData = selectedMake ? VEHICLE_DATABASE[selectedMake] : null;
  const availableModels = makeData ? makeData.models.filter(m => !selectedYear || m.years.includes(Number(selectedYear))) : [];
  const modelData = availableModels.find(m => m.name === selectedModel);
  const availableTrims = modelData ? modelData.trims : [];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedYear || !selectedMake || !selectedModel) return;

    const newVehicle: Vehicle = {
      year: Number(selectedYear),
      make: selectedMake,
      model: selectedModel,
      trim: selectedTrim || undefined
    };

    setActiveVehicle(newVehicle);
    if (saveToGarage) {
      addUserVehicle(newVehicle);
    }
    onClose();
  };

  const handleSelectSaved = (veh: Vehicle) => {
    setActiveVehicle(veh);
    onClose();
  };

  const handleClear = () => {
    setActiveVehicle(null);
    setSelectedYear('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedTrim('');
    onClose();
  };

  return (
    <div id="vehicle-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="vehicle-modal-container" 
        className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-slate-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Select Your Vehicle</h2>
              <p className="text-xs text-slate-500">Filter catalog parts guaranteed to fit your exact vehicle</p>
            </div>
          </div>
          <button 
            id="close-vehicle-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Saved in Garage quick pick */}
          {user && user.savedVehicles.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                From My Garage
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {user.savedVehicles.map((veh, idx) => {
                  const isActive =
                    activeVehicle?.year === veh.year &&
                    activeVehicle?.make === veh.make &&
                    activeVehicle?.model === veh.model;

                  return (
                    <button
                      key={idx}
                      id={`saved-vehicle-${idx}`}
                      type="button"
                      onClick={() => handleSelectSaved(veh)}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-left text-sm transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#fbbf24] bg-amber-50 text-slate-900 shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="truncate">
                        <p className="font-semibold text-slate-900 truncate">
                          {veh.year} {veh.make} {veh.model}
                        </p>
                        {veh.trim && <p className="text-xs text-slate-500 truncate">{veh.trim}</p>}
                      </div>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selector Form */}
          <form onSubmit={handleApply} className="space-y-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              {user && user.savedVehicles.length > 0 ? 'Or Select New Vehicle' : 'Enter Vehicle Details'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Year */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">1. Year</label>
                <select
                  id="select-vehicle-year"
                  value={selectedYear}
                  onChange={(e) => {
                    const y = Number(e.target.value);
                    setSelectedYear(y);
                    setSelectedModel('');
                    setSelectedTrim('');
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:outline-hidden focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]"
                >
                  <option value="">Select Year</option>
                  {POPULAR_YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Make */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">2. Make</label>
                <select
                  id="select-vehicle-make"
                  disabled={!selectedYear}
                  value={selectedMake}
                  onChange={(e) => {
                    setSelectedMake(e.target.value);
                    setSelectedModel('');
                    setSelectedTrim('');
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:outline-hidden focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Make</option>
                  {availableMakes.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">3. Model</label>
                <select
                  id="select-vehicle-model"
                  disabled={!selectedMake}
                  value={selectedModel}
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                    setSelectedTrim('');
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:outline-hidden focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Model</option>
                  {availableModels.map(m => (
                    <option key={m.name} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              {/* Trim */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">4. Trim (Optional)</label>
                <select
                  id="select-vehicle-trim"
                  disabled={!selectedModel}
                  value={selectedTrim}
                  onChange={(e) => setSelectedTrim(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:outline-hidden focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Any Trim / Base</option>
                  {availableTrims.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                id="save-vehicle-checkbox"
                type="checkbox"
                checked={saveToGarage}
                onChange={(e) => setSaveToGarage(e.target.checked)}
                className="w-4 h-4 rounded-sm border-slate-300 text-slate-900 focus:ring-[#fbbf24]"
              />
              <label htmlFor="save-vehicle-checkbox" className="text-xs text-slate-700 cursor-pointer select-none">
                Save to My Garage for future quick filtering
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {activeVehicle ? (
                <button
                  id="clear-vehicle-filter-btn"
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 py-2 px-3 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Active Filter
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  id="cancel-vehicle-modal-btn"
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="apply-vehicle-filter-btn"
                  type="submit"
                  disabled={!selectedYear || !selectedMake || !selectedModel}
                  className="px-5 py-2 text-xs font-bold bg-[#0f172a] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-full transition-colors shadow-xs disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#fbbf24]" />
                  Apply Vehicle Filter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
