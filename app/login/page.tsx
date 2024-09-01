'use client'
import { useState } from 'react';
import { useCheckChangeState } from '../hooks/useCheckChangeState';
import { login } from '../actions/login'
import SectionField from '../components/layouts/SectionField';
import Button from '../components/elements/button/Button';

export default function Login() {
  const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

  const isDisabled = useCheckChangeState(email, password);

  return (
    <div className="flex flex-col p-6 h-screen bg-blue-100 overflow-hidden">
      <SectionField sectionTitle="ログイン">
        <form>
          <div className="flex flex-col mb-6">
            <div>
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <input 
                id="email"
                name="email"
                type="email"
                className="border"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div>
                <label htmlFor="password">Password</label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                className="border"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            variant="primary"
            size="medium"
            attrs={
              {
                type: "submit",
                disabled: isDisabled,
                formAction: login
              }
            }
          >
            ログイン
          </Button>
        </form>
      </SectionField>
    </div>
  )
}