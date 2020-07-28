import * as React from 'react';
import { MaterialsForm } from '../../../types';

interface DataFormProps {
    form: MaterialsForm;
    value: object;
    onChange: (v: object) => void;
}

function IDataForm({ form, value, onChange }: DataFormProps) {}
